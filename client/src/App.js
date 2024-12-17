import './App.css';
import Footer from './Layouts/Footer/Footer';
import Header from './Layouts/Header/Header';
import Main from './Layouts/Main/Main';
import Loading from './Layouts/Loading/Loading';
import ChatBox from './Pages/Chatbox/ChatBox'; // Giữ Chatbox

import { useState, useEffect } from 'react';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <header>
                        <Header />
                    </header>

                    <main>
                        <Main />
                    </main>

                    <footer>
                        <Footer />
                    </footer>

                    {/* Hiển thị Chatbox */}
                    <ChatBox />
                </>
            )}
        </div>
    );
}

export default App;
