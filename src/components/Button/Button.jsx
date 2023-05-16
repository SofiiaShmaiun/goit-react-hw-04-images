import { LoadMoreButton } from '../styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <LoadMoreButton type="button" onClick={onClick}>
    Load more
  </LoadMoreButton>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
