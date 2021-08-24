import './DisplaySelector.css';
import '../../css/notifications.css';

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
              className={`${
                button.value === visualization
                  ? 'checkedVisualization'
                  : 'uncheckedVisualization'
              }
              `}
            >
              <div
                className={`${button.alert > 0 ? 'notificationContainer' : ''}`}
              >
                <img src={button.icon} alt="Visualization Icon" />
                {button.alert > 0 ? (
                  <p className="notificationBubble">{button.alert}</p>
                ) : (
                  ''
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
