import "./Button.css";

const Button = ({className, value, onClick}) => {
    return(
        <button className="button" onClick={onClick}>{value}</button>
    );
};

export default Button;