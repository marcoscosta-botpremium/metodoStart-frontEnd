import imgLoading from '../../assets/loading2.svg';
import { Img } from '../../styles/global';
import { Btn } from './styles';

const Button = ({ loading, children, ...rest }) => {
  return (
    <Btn
      disabled={loading}
      whileTap={{
        scale: loading ? 1 : 0.9,
      }}
      {...rest}
    >
      {loading || children}
      {loading && <Img className="loadingImg" src={imgLoading} alt="loading" />}
    </Btn>
  );
};

export default Button;
