import React from 'react';

const ActionsLoader = () => {
  return (
    <>
      <div className="relative block w-[130px] h-1 rounded-[30px] bg-black/20">
        <div className="animate-moving absolute top-0 left-0 h-full w-0 rounded-[30px] bg-main-background" />
      </div>
    </>
  );
};

export default ActionsLoader;