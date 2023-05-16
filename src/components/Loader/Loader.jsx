import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
  <ThreeDots
    display="inline"
    height="80"
    width="80"
    radius="9"
    color="#3f51b5"
    ariaLabel="three-dots-loading"
    wrapperStyle={{
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translate(-10%, -50%)',
    }}
    wrapperClassName="wrapper"
    visible={true}
  />
);

export default Loader;
