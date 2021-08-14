import './DisplaySelector.css';

export default function DisplaySelector({
  visualizationsButtons,
  setVisualization,
  visualization,
  className,
}) {
  return (
    <nav className={className + ' displaySelector'}>
      <ul>
        {visualizationsButtons.map((button) => (
          <li key={button.value}>
            <button
              onClick={() => setVisualization(button.value)}
              className={
                button.value === visualization
                  ? 'checkedVisualization'
                  : 'uncheckedVisualization'
              }
            >
              <img src={button.icon} alt="Visualization Icon" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
