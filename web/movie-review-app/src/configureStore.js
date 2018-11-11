import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { API_URL } from './Config';
import movieReducer from './Reducer';

const url_api = `${API_URL}`;

const state = {
  movies: [
    {
      movieTitle : 'The Greatest Showman',
      textReview : "Story of a man who has unnatural feelings for a pig. Starts out with a opening scene that is a terrific example of absurd comedy. A formal orchestra audience is turned into an insane, violent mob by the crazy chantings of it's singers. Unfortunately it stays absurd the WHOLE time with no general narrative eventually making it just too off putting. Even those from the era should be turned off. The cryptic dialogue would make Shakespeare seem easy to a third grader. On a technical level it's better than you might think with some good cinematography by future great Vilmos Zsigmond. Future stars Sally Kirkland and Frederic Forrest can be seen briefly.",
      act : 1,
      plot : 1
    },
    {
      movieTitle : 'A Star Is Born',
      textReview : "I cannot stay indifferent to Lars van Trier's films. I consider 'Breaking the Waves' nothing less than a masterpiece. I loved 'Dancer in the Night'. I admired the idea in 'Dogville' but the overall exercise looked to me too dry and too theatrical, less cinema. 'Europa' which I see only now was a famous film at its time, succeeded in the US the relative success of an European film and got the Oscar for the best foreign language movie, but did not survive well the time in my opinion. It is also a too much explicit and extrovert exercise in cinema art to my taste.<br /><br />The story has a level of ambiguity that cannot escape the viewer. Treating the period that immediately followed the second world war not in the black and white colors of victors and vanquished, of executioners and victims but as rather ambiguous times when people of both sides were fighting for survival in the aftermath of a catastrophic event that change the lives of nations and individuals forever is still a source of disputes even today, more such was novel and courageous two decades ago. Yet it is the means of expression that really do not appear fit to the task.<br /><br />The film seems to include a lot of quotes descending directly from the films of Hitchcock, especially his early films set in the pre-war Europe, with brave British spies fighting evil German spies on trains crossing at high speed the continent at dark. The trains were a symbol of the world and its conflicts with all their intensity and dramatism. Here the train also becomes the symbol of the first sparkles of the re-birth of Germany after war, of its might, of its obsession with order and regulation, of punctuality and civility. The characters that populate the train are far from being the classical spy stories good or bad guys. The principal character a young American of German origin coming to post-war Europe willing to be part of a process of help and reconciliation finds himself in an ambiguous world of destruction and corruption, with liberators looking more like oppressive occupiers, with the vanquished not resigned to their fate but rather willing to continue on the path of self-destruction, with love doubtfully mixed with treason.<br /><br />It is yet this classical film treatment that betrays the director in this case. The actions of the characters, especially of Leopold Kessler played by Jean-Marc Barr seem confused, and lack credibility. The overall cinematography seems to be not Hitchcock-like but rather from a bad imitation of Hitchcock in the late 30s. The usage of color over the black-and-white film used in the majority of the time in moments of emotional intensity is also too demonstrative. It is not that Van Trier does not master his artistic means, but he is too demonstrative, he seems to try too hard to show what a great filmmaker he is. He really is great, as he will show in some of his later films, but it will be left to the viewers to decide this alone.",
      act : -1,
      plot : -1
    }
  ],
}

export default function configureStore(initialState = state){
  const store = createStore(movieReducer, initialState, applyMiddleware(thunk.withExtraArgument(url_api)));
  return store;
}