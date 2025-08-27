import React, { useState } from "react";
import { useNotification } from "@hooks/useNotification";
import MessageNotification from "@shared/MessageNotification";
import SectionBlock from "@layouts/SectionBlock";
import { BsMagic, BsPencil } from "react-icons/bs";
import Button from "@shared/Button";

import PostHeader from "./componentsPosts/PostHeader";
import PostContent from "./componentsPosts/PostContent";
import PostActions from "./componentsPosts/PostActions";

const Post = ({ postData, onSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(postData?.content);
  const { notification, hideNotification } = useNotification();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateContent = (newContent) => {
    setCurrentContent(newContent);
    setIsEditing(false);
 
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <MessageNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        autoHide
        duration={5000}
        position="top-center"
        showProgressBar
      />

      <div className="w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl p-6">
        <div className="space-y-6">
          <PostHeader 
            socialId={postData?.social_id} 
            createdAt={postData?.created_at}
            onEdit={handleEdit}
            isEditing={isEditing}
          />
          
          <PostContent 
            content={currentContent}
            hashtags={postData?.hashtags}
            postId={postData?.id}
            onUpdate={handleUpdateContent}
            isEditing={isEditing}
            onEdit={handleEdit}
            onCancelEdit={handleCancelEdit}
          />
          
          <PostActions content={currentContent} />
        </div>

        <div className="mt-6 space-y-4">
          <SectionBlock
            title="Prompt"
            icon={<BsMagic />}
            action={
              <Button color="neutral" circle size="none" className="p-2">
                <BsPencil size={12} />
              </Button>
            }
          >
            {postData?.prompt || "Aucun prompt disponible"}
          </SectionBlock>
        </div>
      </div>
    </>
  );
};

export default Post;