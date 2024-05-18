document.addEventListener('DOMContentLoaded', function() {
    // API endpoint for fetching blog data
    const apiEndpoint = 'https://coding-week-2024-api.onrender.com/api/data';

    // Function to fetch data from the API
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to create HTML elements for blog items
    function createBlogItem(blog) {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');

        const image = document.createElement('img');
        image.src = blog.image;
        image.alt = 'Blog Image';
        blogItem.appendChild(image);

        const headline = document.createElement('h3');
        headline.textContent = blog.headline;
        blogItem.appendChild(headline);

        const date = document.createElement('p');
        date.textContent = blog.date;
        blogItem.appendChild(date);

        if (blog.author) {
            const author = document.createElement('p');
            author.textContent = 'By ' + blog.author;
            blogItem.appendChild(author);
        }

        const content = document.createElement('p');
        content.textContent = blog.content;
        blogItem.appendChild(content);

        return blogItem;
    }

    // Function to populate blog sections with data
    function populateBlogSections(data) {
        const featuredBlogSection = document.getElementById('featured-blog');
        const recentBlogSection = document.getElementById('recent-blog');

        data.forEach(blog => {
            const blogItem = createBlogItem(blog);
            if (blog.type === 'historic') {
                recentBlogSection.appendChild(blogItem);
            } else {
                featuredBlogSection.appendChild(blogItem);
            }
        });
    }

    // Fetch data from the API and populate the HTML structure
    fetchData(apiEndpoint)
        .then(data => populateBlogSections(data))
        .catch(error => console.error('Error:', error));
});
