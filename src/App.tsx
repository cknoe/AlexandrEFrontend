import Card from "./components/Card"
import Header from "./components/Header"
import "./css/main.css"

export default function App() {
    return (
        <>
        <Header/>
        <main className="main">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </main>
        </>
    )
}