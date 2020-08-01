import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetails';

const KEY = 'AIzaSyAKNqBzbp41f5tQ3EIygogwBaMJyNd16o4';

class App extends React.Component{
    state = { videos: [], selectedVideo: null };

    componentDidMount(){
        this.onTermSubmit('videos');
    }

    onTermSubmit = async (term) => {
        //console.log(term);
        const response = await youtube.get('/search', {
            params: {
                q: term,
                part: 'snippet',
                type: 'video',
                maxResults: 5,
                key: KEY
            }
        });

        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });

    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    render(){
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList 
                                onVideoSelect={this.onVideoSelect} 
                                videos={this.state.videos} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        );           
    }
}

export default App;