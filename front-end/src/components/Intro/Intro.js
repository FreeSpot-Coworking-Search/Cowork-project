import CreatorProfile from '../CreatorProfile/CreatorProfile';
import './Intro.css';
import foto1 from '../../assets/img/Foto Curriculum.jpg';
import foto2 from '../../assets/img/DSC04573.jpg';
export default function Intro() {
  return (
    <>
      <div id="container">
        Coworkink Projet
        <div id="flip">
          <div>
            <div>comparte</div>
          </div>
          <div>
            <div>encuentra</div>
          </div>
          <div>
            <div>busca</div>
          </div>
        </div>
        vamos!
      </div>
      <div className="contact">
        <div>
          <p>Creado por:</p>
        </div>
        <CreatorProfile
          foto={foto1}
          nombre={'Daniel Martinez'}
          linkedIn="https://www.linkedin.com/in/danielmartinezgonzalez-developer/"
          gitHub="https://github.com/j-coast"
          mail="jcoastmail@gmail.com"
        />
        <CreatorProfile
          foto={foto2}
          nombre={'Ricardo Zarroca'}
          linkedIn="https://www.linkedin.com/in/rzarroca"
          gitHub="https://github.com/rzarroca"
          mail="ricardozarroca@gmail.com"
        />
      </div>
    </>
  );
}
