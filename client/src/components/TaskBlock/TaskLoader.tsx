import React from "react"
import ContentLoader from "react-content-loader"

const TaskLoader: React.FC = (): React.ReactElement => (
  // <ContentLoader 
  //   speed={2}
  //   width={360}
  //   height={360}
  //   viewBox="0 0 380 380"
  //   backgroundColor="#d8d8d8"
  //   foregroundColor="#ecebeb"
  // >
  //   <rect x="0" y="0" rx="6" ry="6" width="360" height="360" />
  // </ContentLoader>
  <ContentLoader 
    speed={2}
    width={360}
    height={360}
    viewBox="0 0 360 360"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="44" cy="52" r="26" /> 
    <rect x="16" y="97" rx="15" ry="15" width="93" height="31" /> 
    <rect x="82" y="24" rx="8" ry="8" width="227" height="50" /> 
    <rect x="116" y="97" rx="15" ry="15" width="109" height="31" /> 
    <rect x="19" y="147" rx="8" ry="8" width="298" height="204" />
  </ContentLoader>
)

export default TaskLoader