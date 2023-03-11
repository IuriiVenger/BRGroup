import classes from './Button.module.scss';

interface IButtonProps {
  text: string;
  image?: string;
  usersClasses?: string;
}

const Button: React.FunctionComponent<IButtonProps> = ({ text, image, usersClasses }) => {
  return (
    <button className={`${classes.customButton} ${usersClasses} `}>
      {image && <img src={image} alt='button-icon' />}
      <p>{text}</p>
    </button>
  );
};

export default Button;
