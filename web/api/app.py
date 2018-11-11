import numpy as np
import pandas as pd
from nltk import tokenize
from nltk.stem import PorterStemmer 
from nltk.tag import StanfordPOSTagger
from nltk.tokenize import word_tokenize 
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import f1_score
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, request, jsonify
from sklearn.externals import joblib

app = Flask(__name__)



def preprocessing(document, skip_before_keyword=False, skip_after_keyword=False, prev_bag_of_word=1, after_bag_of_word=5) :
    act = ['acting','role playing','act',' actress','actor','role','portray','character','villain','performance', 'play', 'perform', 'doing']
    plot = ['plot','story','storyline','tale','romance','dialog','script','storyteller',' ending','storytelling','revenge','betrayal','writing']
    
    sid = SentimentIntensityAnalyzer()
    
    act_sentence = []
    plot_sentence = []
    act_score = 0
    plot_score = 0
    tokenizer = tokenize.PunktSentenceTokenizer()
    ps = PorterStemmer()
    
    list_sentence = tokenizer.sentences_from_text(document)
    for sentence in list_sentence :
        is_sentence_act = False
        is_sentence_plot = False
        list_word = tokenize.word_tokenize(sentence)
        for word in list_word :
            if (ps.stem(word.lower()) in act or word.lower() in act):
                list_adj_sentence, adj_found = search_adj(sentence, word, prev_bag_of_word=prev_bag_of_word, after_bag_of_word=after_bag_of_word)
                for adj_word in (list_adj_sentence) :
                    act_sentence.append(adj_word)
                    act_score += sid.polarity_scores(adj_word)['pos'] - sid.polarity_scores(adj_word)['neg']
            if (ps.stem(word.lower()) in plot or word.lower() in plot):
                list_adj_sentence, adj_found = search_adj(sentence, word, prev_bag_of_word=prev_bag_of_word, after_bag_of_word=after_bag_of_word)
                for adj_word in (list_adj_sentence) :
                    plot_sentence.append(adj_word)
                    plot_score +=  sid.polarity_scores(adj_word)['pos'] - sid.polarity_scores(adj_word)['neg']
    return ([act_score,plot_score])

def search_adj(sentence, keyword, skip_before_keyword=False, skip_after_keyword=False, prev_bag_of_word=1, after_bag_of_word=5) :    
    st = StanfordPOSTagger('../../src/english-bidirectional-distsim.tagger', '../../src/stanford-postagger-3.9.2.jar')
    
    punctuation = ['.', ',', '"', "'", '?', '!', ':', ';', '(', ')', '[', ']', '{', '}'] # remove it if you need punctuation 
    
    word_tokens = word_tokenize(sentence) 
    filtered_sentence = [w for w in word_tokens if not w in punctuation] 
    filtered_sentence = [] 
  
    for w in word_tokens: 
        if w not in punctuation:
            filtered_sentence.append(w)
            
    list_word_tag = st.tag([(" ").join(filtered_sentence)])
    found_keyword = not skip_before_keyword
    list_sentiment_word = []
    found_adjective = 0
    keyword_idx = -1
    for idx in range (len(list_word_tag)) :
        if (list_word_tag[idx][0] == keyword) :
            keyword_idx = idx
            break
    
    if (skip_before_keyword) :
        prev_bag_of_word = 0
    
    if (skip_after_keyword) :
        after_bag_of_word = 0
        
    for idx in range (len(list_word_tag)) :
        if (idx > keyword_idx + after_bag_of_word) :
                break
                
        if ((idx >= keyword_idx - prev_bag_of_word) and list_word_tag[idx][1] == 'JJ') :
            found_adjective += 1
            sentiment_word = list_word_tag[idx][0]
            for adverb_idx in range (idx-1, -1, -1) :
                if (list_word_tag[adverb_idx][1] == 'RB') :
                    sentiment_word = list_word_tag[adverb_idx][0] + " " + sentiment_word
                else :
                    break
            list_sentiment_word.append(sentiment_word)
            
    return (list_sentiment_word, found_adjective)

def predict_sentiment(teks) :
    sentiment_score = preprocessing(teks)
    sentiment_score_act = pd.DataFrame([sentiment_score[0]], columns=["sentiment_score"])
    sentiment_score_plot = pd.DataFrame([sentiment_score[1]], columns=["sentiment_score"])
    xgb1 = joblib.load('../../src/model_xgb_act.h5')
    xgb2 = joblib.load('../../src/model_xgb_plot.h5')
    act_sentiment = xgb1.predict(sentiment_score_act)
    plot_sentiment = xgb2.predict(sentiment_score_plot)
    
    return(act_sentiment[0], plot_sentiment[0])

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
      try:
        text = request.get_data(as_text=True)
        print(text)
        act_sentiment, plot_sentiment = predict_sentiment(text)
        if (act_sentiment == 1) :
            print("acting => positive")
        else :
            print("acting => negative")
        if (plot_sentiment == 1) :
            print("plot => positive")
        else :
            print("plot => negative")

      except ValueError:
        return jsonify("Error")
    return jsonify(text)
        
if __name__ == '__main__':
    app.run(debug=True)




    
    
