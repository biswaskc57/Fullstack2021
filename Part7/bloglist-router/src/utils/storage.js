const key = "loggedBlogappUser";

const saveUser = (user) => localStorage.setItem(key, JSON.stringify(user));

const getUser = () => JSON.parse(localStorage.getItem(key));

const logoutUser = () => localStorage.removeItem(key);

export default { saveUser, getUser, logoutUser };
