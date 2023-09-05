# Creating a Social Media app with React and the Mern Stack

### This app mainly focuses on use the mern stack to create a Social media app

### This app will let different users sign in and create posts, each post will be viewable by other users

### It will also be possible to view other profile pages by clicking on their profile on their post

## Some components that are used

### Page to authenticate a user

Used for login and signup features

### Page to display last so many posts shown

### A User page that displays a user based on their Profile

This page will options to edit, delete, and create a post if the page belongs to the logged in user

### React side diagram

![Alt text](image-1.png)

### Troublesome areas

For the most part, I was able to figure stuff out. One particularly troublesome area was the delete function for posts. Deleting the post itself was not necessarily the problem, it was removing the link from the user.

Luckily a found logic using $pull. I used this on the user's posts list to remove the id
Of course, this only made it null, so I had to whip up some logic that checks to make sure we don't display data for a null value post

Another troublesome part was what to do after creating a new post. After some work, I managed to get it to work by allowing default form operations
