import './CreatorProfile.css';
import { GitHub, LinkedIn, IdCard } from '../../components/Icons/Icons';

export default function CreatorProfile({
  nombre,
  foto,
  linkedIn,
  gitHub,
  mail,
}) {
  return (
    <section className="creatorProfile">
      <img src={foto} className="profileFoto" />
      <div className="profileText">
        <p>{nombre}</p>
      </div>
      <div className="profileLinks">
        <a href={linkedIn} target="_blank">
          <LinkedIn />
        </a>
        <a href={gitHub} target="_blank">
          <GitHub />
        </a>
        <a href={`mailto:${mail}`} target="_blank">
          <IdCard />
        </a>
      </div>
    </section>
  );
}
