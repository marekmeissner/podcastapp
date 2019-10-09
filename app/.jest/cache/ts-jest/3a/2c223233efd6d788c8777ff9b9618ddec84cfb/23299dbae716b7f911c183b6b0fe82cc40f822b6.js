import firebase from 'react-native-firebase';
const EmailPasswordSignIn = async ({ email, password }) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch (e) {
        throw new Error(e);
    }
};
export { EmailPasswordSignIn };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL3ByaXZhdGUvdmFyL3d3dy9IaWxsY29kZS9wb2RjYXN0YXBwL2FwcC9maXJlYmFzZS9hdXRoL3NpZ25Jbi50cyIsIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUc3QyxNQUFNLG1CQUFtQixHQUFHLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQWtCLEVBQUUsRUFBRTtJQUN2RSxJQUFJO1FBQ0YsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsMEJBQTBCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ25FO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL3ByaXZhdGUvdmFyL3d3dy9IaWxsY29kZS9wb2RjYXN0YXBwL2FwcC9maXJlYmFzZS9hdXRoL3NpZ25Jbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmlyZWJhc2UgZnJvbSAncmVhY3QtbmF0aXZlLWZpcmViYXNlJztcbmltcG9ydCB7VXNlckNyZWRlbnRpYWxzfSBmcm9tICcuLi8uLi9zcmMvc2NyZWVucy9BdXRoL3R5cGVzJztcblxuY29uc3QgRW1haWxQYXNzd29yZFNpZ25JbiA9IGFzeW5jICh7ZW1haWwsIHBhc3N3b3JkfTogVXNlckNyZWRlbnRpYWxzKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7RW1haWxQYXNzd29yZFNpZ25Jbn07XG4iXSwidmVyc2lvbiI6M30=