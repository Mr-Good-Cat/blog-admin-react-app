# Crypto blog (admin)
One of three repositories to deploy a simple blog.

### Related repositories:
- [Crypto blog (backend)](https://github.com/Mr-Good-Cat/blog-backend-nestjs)
- [Crypto blog (frontend)](https://github.com/Mr-Good-Cat/blog-frontend-nextjs)

The application allows you to create/update categories and articles within them.
The structure should be as follows: each article should lie within a category; 
each category lies within the main category; the main category is the root; 

You can use markdown to edit the article description:
- \~paragraph\~
- \*bold\*
- \_italic\_
- \*\_italicbold\_\*
- \[title\](link)
- \!\[iconLink\](iconAlt "iconTitle")

To gain access, you must log in through the [metamask](https://metamask.io/) crypto wallet.

### Stack:
- React
- Tailwind CSS
- Wagmi


## Instructions to run the project with Docker
Command: `docker-compose up` and then visit `localhost:3001`
