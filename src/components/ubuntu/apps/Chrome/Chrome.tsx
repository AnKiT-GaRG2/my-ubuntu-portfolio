import React, { Component } from 'react';
import { RotateCw, Home } from 'lucide-react';

interface ChromeState {
    url: string;
    display_url: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class Chrome extends Component<{}, ChromeState> {
    private home_url: string;

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    constructor(props: {}) {
        super(props);
        this.home_url = 'https://www.google.com/webhp?igu=1';
        this.state = {
            url: 'https://www.google.com/webhp?igu=1',
            display_url: "https://www.google.com",
        }
    }

    componentDidMount() {
        const lastVisitedUrl = localStorage.getItem("chrome-url");
        const lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        if (lastVisitedUrl !== null && lastVisitedUrl !== undefined) {
            this.setState({ url: lastVisitedUrl, display_url: lastDisplayedUrl || "" }, this.refreshChrome);
        }
    }

    storeVisitedUrl = (url: string, display_url: string) => {
        localStorage.setItem("chrome-url", url);
        localStorage.setItem("chrome-display-url", display_url);
    }

    refreshChrome = () => {
        const iframe = document.getElementById("chrome-screen") as HTMLIFrameElement;
        if (iframe) {
            iframe.src += '';
        }
    }

    goToHome = () => {
        this.setState({ url: this.home_url, display_url: "https://www.google.com" });
        this.refreshChrome();
    }

    checkKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            let url = e.currentTarget.value;
            let display_url = "";

            url = url.trim();
            if (url.length === 0) return;

            if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
                url = "https://" + url;
            }

            url = encodeURI(url);
            display_url = url;
            if (url.includes("google.com")) { // 😅
                url = 'https://www.google.com/webhp?igu=1';
                display_url = "https://www.google.com";
            }
            this.setState({ url, display_url: url });
            this.storeVisitedUrl(url, display_url);
            const urlBar = document.getElementById("chrome-url-bar") as HTMLInputElement;
            if (urlBar) urlBar.blur();
        }
    }

    handleDisplayUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ display_url: e.target.value });
    }

    displayUrlBar = () => {
        return (
            <div className="w-full pt-0.5 pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900">
                <button 
                    onClick={this.refreshChrome} 
                    className="ml-2 mr-1 p-1.5 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 cursor-pointer"
                    aria-label="Refresh"
                >
                    <RotateCw className="w-4 h-4" />
                </button>
                <button 
                    onClick={this.goToHome} 
                    className="mr-2 ml-1 p-1.5 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 cursor-pointer"
                    aria-label="Home"
                >
                    <Home className="w-4 h-4" />
                </button>
                <input 
                    onKeyDown={this.checkKey} 
                    onChange={this.handleDisplayUrl} 
                    value={this.state.display_url} 
                    id="chrome-url-bar" 
                    className="outline-none bg-gray-700 rounded-full pl-3 py-0.5 mr-3 w-5/6 text-gray-300 focus:text-white" 
                    type="url" 
                    spellCheck={false} 
                    autoComplete="off" 
                />
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full flex flex-col bg-gray-800">
                {this.displayUrlBar()}
                <iframe src={this.state.url} className="flex-grow" id="chrome-screen" frameBorder="0" title="Ubuntu Chrome Url"></iframe>
            </div>
        )
    }
}

export default Chrome;