import { useState } from "react";
import ReactSlider from "react-slider";



export const Slider: React.FunctionComponent = () => {

  const [min, setMin] = useState(1950);
  const [max, setMax] = useState(2023);

  return (
    <div>
      <div className="dropdown-header">
        <p className="slider-min-text">{min}</p>
        <h2 className="slider-title">Year</h2>
        <p className="slider-max-text">{max}</p>
      </div>
      <div className="slider-container">
        <ReactSlider
          defaultValue={[min, max]}
          className="slider"
          trackClassName="tracker"
          min={1950}
          max={2023}
          minDistance={0}
          step={1}
          withTracks={true}
          pearling={true}
          renderThumb={(props) => {
            return <div {...props} className="thumb"> </div>
          }}
          renderTrack={(props) => {
            return <div {...props} className="track"> </div>
          }}
          onChange={([min, max]) => {
            setMin(min!);
            setMax(max!);
          }}
        />
      </div>
    </div>
  )
}


// @TODO clicking title should take you to first page
