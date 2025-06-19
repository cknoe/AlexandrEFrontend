import "../css/header.css"
type HeaderProps = {
  onOpenModal: () => void;
};

export default function Header({onOpenModal}: HeaderProps) {
return (
    <>
    <header className="header">
        <button onClick={onOpenModal}>Hello Header</button>
    </header>
    <div className="blankspace">
    </div>
    </>
);
}
