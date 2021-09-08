import './noMatch.css';

export default function NoMatch({ className }) {
    console.log('en nomatch');
    return (
        <article className={className + ' mainSectionFullViewExpand'}>
            <section className="presentation noMatch">
                <h3>Página no encontrada</h3>
            </section>
        </article>
    );
}
