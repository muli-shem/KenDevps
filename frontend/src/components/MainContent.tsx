import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import EducationCard from '../Pages/Education/Education';
import HumanRightsCard from '../Pages/Education/HumanRights';
import { humanRightsContent } from './RightSidebar';
import '../styles/MainContent.scss';

interface MainContentProps {
  currentView: string;
  likedItems: Record<string, boolean>;
  dislikedItems: Record<string, boolean>;
  bookmarkedItems: Record<string, boolean>;
  handleLike: (id: string) => void;
  handleDislike: (id: string) => void;
  handleBookmark: (id: string) => void;
  handleNavigation: (view: string) => void;
}

const MainContent = ({
  currentView,
  likedItems,
  dislikedItems,
  bookmarkedItems,
  handleLike,
  handleDislike,
  handleBookmark,
}: MainContentProps) => {
  const { posts, status, error } = useSelector((state: RootState) => state.posts);
  const educationContent = useSelector((state: RootState) => state.education.items);

  // Function to render the correct content based on currentView
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <section className="posts">
            {status === 'loading' && <p>Loading posts...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
              <ul>
                {Array.isArray(posts) && posts.map((post) => (
                  <li key={post.id}>
                    <p>{post.content}</p>
                    <small>By {post.author} on {new Date(post.timestamp).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      
      case 'education':
        return (
          <section className="education-content">
            <h2>Civic Education</h2>
            {educationContent.length === 0 ? (
              <p>Loading educational content...</p>
            ) : (
              <div className="education-cards">
                {educationContent.map((content) => (
                  <EducationCard 
                    key={content.id}
                    content={{
                      id: content.id.toString(),
                      title: content.title,
                      content: content.content,
                      content_type: content.content_type,
                      created_by: content.created_by.toString(),
                      // Convert null to undefined to match the expected type
                      image_url: content.image_url || undefined
                    }}
                    isLiked={likedItems[content.id] || false}
                    isDisliked={dislikedItems[content.id] || false}
                    isBookmarked={bookmarkedItems[content.id] || false}
                    onLike={() => handleLike(content.id.toString())}
                    onDislike={() => handleDislike(content.id.toString())}
                    onBookmark={() => handleBookmark(content.id.toString())}
                  />
                ))}
              </div>
            )}
          </section>
        );
      
      case 'humanrights':
        return (
          <section className="human-rights-content">
            <h2>Human Rights Information</h2>
            <div className="rights-cards">
              {humanRightsContent.map((content) => (
                <HumanRightsCard 
                  key={content.id}
                  content={content}
                  isLiked={likedItems[content.id] || false}
                  isBookmarked={bookmarkedItems[content.id] || false}
                  onLike={() => handleLike(content.id.toString())}
                  onBookmark={() => handleBookmark(content.id.toString())}
                />
              ))}
            </div>
          </section>
        );
      
      case 'explore':
        return <div className="content-placeholder">Explore content will appear here</div>;
      
      case 'notifications':
        return <div className="content-placeholder">Notifications will appear here</div>;
      
      case 'messages':
        return <div className="content-placeholder">Messages will appear here</div>;
      
      case 'profile':
        return <div className="content-placeholder">Profile will appear here</div>;
      
      default:
        return <div className="content-placeholder">Select an option from the sidebar</div>;
    }
  };

  return (
    <main className="main-content">
      <header>
        <h1>AfriVoice Hub</h1>
      </header>
      <div className="scrollable-content">
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;