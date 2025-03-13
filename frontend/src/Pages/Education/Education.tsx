import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaBookmark } from 'react-icons/fa';
import '../../styles/Cards.scss';

interface EducationContent {
  id: string;
  title: string;
  content: string;
  content_type: string;
  created_by: string;
  image_url?: string;
}

interface EducationCardProps {
  content: EducationContent;
  isLiked: boolean;
  isDisliked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onDislike: () => void;
  onBookmark: () => void;
}

const EducationCard = ({
  content,
  isLiked,
  isDisliked,
  isBookmarked,
  onLike,
  onDislike,
  onBookmark
}: EducationCardProps) => {
  return (
    <div className="card education-card">
      {content.image_url && (
        <div className="card-image">
          <img src={content.image_url} alt={content.title} />
        </div>
      )}
      <div className="card-content">
        <h3>{content.title}</h3>
        <p>{content.content}</p>
        <small>Type: {content.content_type} | Created by: {content.created_by}</small>
        
        <div className="card-actions">
          <button 
            className={`action-btn ${isLiked ? 'active' : ''}`}
            onClick={onLike}
          >
            <FaThumbsUp /> {isLiked ? 'Liked' : 'Like'}
          </button>
          <button 
            className={`action-btn ${isDisliked ? 'active' : ''}`}
            onClick={onDislike}
          >
            <FaThumbsDown /> {isDisliked ? 'Disliked' : 'Dislike'}
          </button>
          <button className="action-btn">
            <FaShareAlt /> Share
          </button>
          <button 
            className={`action-btn ${isBookmarked ? 'active' : ''}`}
            onClick={onBookmark}
          >
            <FaBookmark /> {isBookmarked ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;