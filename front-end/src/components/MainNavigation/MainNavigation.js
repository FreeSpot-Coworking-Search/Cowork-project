import './MainNavigation.css';
import locationIcon from '../../assets/icons/bxs-location-plus 1.png';

export default function MainNavigation() {
  return (
    <form action="" method="get" class="mainNavigation">
      <div class="mainNavigation-box">
        <img
          src={locationIcon}
          alt="locationIcon"
          class="mainNavigation-box-icon"
        />
        <label for="data"></label>
        <input
          class="mainNavigation-box-input"
          type="text"
          name="data"
          id="data"
          required
          placeholder="enter search"
        />
      </div>

      <div class="mainNavigation-box">
        <img
          src={locationIcon}
          alt="locationIcon"
          class="mainNavigation-box-icon"
        />
        <label for="minCapacity">minimum capacity</label>
        <input
          class="mainNavigation-box-input"
          type="number"
          name="minCapacity"
          id="minCapacity"
          value="1"
          min="1"
        />
        <br />
        <label for="space">type</label>
        <select id="space" name="space" class="mainNavigation-box-input">
          <option value="">-- spaces availables --</option>
          <option value="Mesa Flex">Mesa Flex</option>
          <option value="Mesa Fija">Mesa Fija</option>
          <option value="Despacho">Despacho</option>
          <option value="Sala de reuniones">Sala de reuniones</option>
        </select>
      </div>

      <div class="mainNavigation-box">
        <img
          src={locationIcon}
          alt="locationIcon"
          class="mainNavigation-box-icon"
        />
        <label for="in-date">check-in</label>
        <input
          class="mainNavigation-box-input"
          type="date"
          name="in-date"
          id="in-date"
          placeholder="check-in date"
          required
        />
        <br />
        <label for="out-date">check-out</label>
        <input
          class="mainNavigation-box-input"
          type="date"
          name="out-date"
          id="out-date"
          placeholder="check-out date"
          required
        />
      </div>
    </form>
  );
}
