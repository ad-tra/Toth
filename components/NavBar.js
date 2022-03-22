export default function NavBar(){
   return (
    <nav>
    <div className="logo"><a href="/"> TOTH</a></div>
    <ul className="nav-links">
      <li className="nav-dropdown"><a style={{cursor: 'default'}} href="#">Topics</a>
        <ul className="dropdown" id="sources">
          <li className="dropdown-option">
            <div id="articlesOfNote" className="link">Literature</div>
            <div id="science" className="link">Science</div>
          </li>
          <div className="separateur" />
          <li className="dropdown-option">
            <div id="essaysOpinions" className="link">Social Science</div>
            <div id="history" className="link">History</div>
          </li>
        </ul>
      </li>
      <li className="nav-dropdown"><a href="#" style={{cursor: 'default'}}>Customize</a>
        <ul className="dropdown">
          <li className="dropdown-option">
            <svg xmlns="http://www.w3.org/2000/svg" width="22px" viewBox="0 0 512 512"><circle cx={256} cy="378.5" r={25} /><path d="M256 0C114.5 0 0 114.5 0 256c0 141.5 114.5 256 256 256 141.5 0 256-114.5 256-256C512 114.5 397.5 0 256 0zM256 472c-119.4 0-216-96.6-216-216 0-119.4 96.6-216 216-216 119.4 0 216 96.6 216 216C472 375.4 375.4 472 256 472z" /><path d="M256 128.5c-44.1 0-80 35.9-80 80 0 11 9 20 20 20s20-9 20-20c0-22.1 17.9-40 40-40 22.1 0 40 17.9 40 40 0 22.1-17.9 40-40 40 -11 0-20 9-20 20v50c0 11 9 20 20 20 11 0 20-9 20-20v-32.5c34.5-8.9 60-40.3 60-77.5C336 164.4 300.1 128.5 256 128.5z" /></svg>
            <div id="feeling-lucky" className="link">Change Color</div>
          </li>
          <li className="separateur" />
          <li className="dropdown-option">
            <svg xmlns="http://www.w3.org/2000/svg" width="22px" viewBox="0 0 313 313"><path d="M305.6 178.1c-3.2-0.8-6.4 0-9.2 2 -10.4 8.8-22.4 16-35.6 20.8 -12.4 4.8-26 7.2-40.4 7.2 -32.4 0-62-13.2-83.2-34.4 -21.2-21.2-34.4-50.8-34.4-83.2 0-13.6 2.4-26.8 6.4-38.8 4.4-12.8 10.8-24.4 19.2-34.4 3.6-4.4 2.8-10.8-1.6-14.4 -2.8-2-6-2.8-9.2-2 -34 9.2-63.6 29.6-84.8 56.8 -20.4 26.8-32.8 60-32.8 96.4 0 43.6 17.6 83.2 46.4 112s68.4 46.4 112 46.4c36.8 0 70.8-12.8 98-34 27.6-21.6 47.6-52.4 56-87.6C314.4 184.9 311.2 179.3 305.6 178.1zM244.4 261.7c-23.2 18.4-52.8 29.6-85.2 29.6 -38 0-72.4-15.6-97.2-40.4 -24.8-24.8-40.4-59.2-40.4-97.2 0-31.6 10.4-60.4 28.4-83.6 12.4-16 28-29.2 46-38.4 -2 4.4-4 8.8-5.6 13.6 -5.2 14.4-7.6 29.6-7.6 45.6 0 38 15.6 72.8 40.4 97.6s59.6 40.4 97.6 40.4c16.8 0 32.8-2.8 47.6-8.4 5.2-2 10.4-4 15.2-6.4C274 232.5 260.8 248.9 244.4 261.7z" /></svg>
            <div style={{color: 'var(--black)', cursor: 'default'}}> Night Mode</div>
            <label id="darkSwitch" className="switch">
              <input type="checkbox" /> 
              <span className="slider" />
            </label>
          </li>
        </ul>
      </li>
      <li><a href="#">About</a></li>
    </ul>
    <svg version="1.1" className="background-pattern" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" style={{enableBackground: 'new 0 0 256 256'}} xmlSpace="preserve">
      <g>
        <path d="M82.8,234.8h42v-91.4c-23.3,1.1-42,18.1-42,47.2V234.8z" />
        <path d="M183.6,106c0,13.9-5.4,27.1-15.3,36.9c-7.1,7.1-11,16.5-11,26.5v43.3h92.4V96.2c0-36.9-29.5-67.1-66.1-68.2V106z" />
        <path d="M77.1,50C35.6,56.2,3.7,92,3.7,135.2h14.8c0-22,17.9-39.9,39.9-39.9h18.7C77.1,95.3,77.1,50,77.1,50z" />
        <rect x="99.2" y={50} width="46.4" height="46.4" />
      </g>
    </svg>
    <svg version="1.1" className="background-pattern" id="layer_2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" style={{enableBackground: 'new 0 0 256 256'}} xmlSpace="preserve">
      <g>
        <path d="M82.8,234.8h42v-91.4c-23.3,1.1-42,18.1-42,47.2V234.8z" />
        <path d="M183.6,106c0,13.9-5.4,27.1-15.3,36.9c-7.1,7.1-11,16.5-11,26.5v43.3h92.4V96.2c0-36.9-29.5-67.1-66.1-68.2V106z" />
        <path d="M77.1,50C35.6,56.2,3.7,92,3.7,135.2h14.8c0-22,17.9-39.9,39.9-39.9h18.7C77.1,95.3,77.1,50,77.1,50z" />
        <rect x="99.2" y={50} width="46.4" height="46.4" />
      </g>
    </svg>
  </nav>
   )
}