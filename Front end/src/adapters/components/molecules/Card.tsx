import "./molecules.scss"

const Card = ({ children, style }: { children: React.ReactNode, style?:React.CSSProperties  }) => {
    return <div className="Card" style={style}>{children}</div>;
};

export default Card;