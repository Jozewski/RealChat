const OnlineUsers = ({ users }) => {
  return (
    <div className="">
      <div className="h-screen grid grid-cols-2 gap-0 ">
        {users.map((user, index) => (
        
            <div key={index}>
              {user.avatar ? (
                <img src={`${user.avatar}`} className="w-10 h-10 rounded-full" />
              ) : (
                "No avatar"
              )}
            <div className="block text-sm text-purple-700 dark:text-white">{user.username}</div>
            </div>
        
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
