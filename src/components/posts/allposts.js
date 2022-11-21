import { useState, useEffect } from "react"
import { AllPostsSingleView } from "./allPostsSingleView";
import { getAllPosts, getAllPostsByCategory, getAllPostsByTitleSearch } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { Link, useNavigate } from "react-router-dom";


// This component is responsible for rendering all posts. The user will have the ability to navigate to create a new post, as well as search posts by title.
export const AllPosts = ({searchTermState}) => {
    const[allPosts, setAllPosts] = useState([])
    const[filteredPosts, setSearched] = useState([])
    const[searchedTitle, setSearchedTitle] = useState("")
    const[categories, setCategories] = useState([])
    const[currentCategory, setCurrentCategory] = useState({
      "id": 0,
      "label": ""
    })
    const navigate = useNavigate()

    // This useEffect hook fetches the full array of posts.
    useEffect(() => {
    getAllPosts()
      .then((allPostsArray) => {
        setAllPosts(allPostsArray);
      });
  }, []);


    useEffect(() => {
    getAllCategories()
      .then((categoriesArray) => {
        setCategories(categoriesArray);
      });
  }, []);


  const searchBarReset = () => {
    
  }

  const sendTitleSearchRequestToApi = (value) => {
    getAllPostsByTitleSearch(value).then((filteredPostsArray) => {
        setAllPosts(filteredPostsArray);
      });

  }

  const renderSearchBar = () => {
    return <>
    <div className="level-item">
    <input
    type="text"
    className="input"
    placeholder="Search posts by title"
    onChange={(changeEvent) => {
            let searchCopy = changeEvent.target.value
            setSearchedTitle(searchCopy);}}
    ></input>
    <button className="button is-primary is-normal"
    onClick={() => {
            sendTitleSearchRequestToApi(searchedTitle);}}
    >Submit</button>
    </div>
    </>
  }

  const renderCategoryDropDown = () => {

    return <>
    <div className="level-item">
    <div className="select is-primary">
    <select
                  className="regularformstyle"
                  value={currentCategory.id}
                  required
                  autoFocus
                  onChange={(evt) => {
                    const copy = parseInt(evt.target.value);
                    setCurrentCategory(copy);
                  }}
                  >
                    <option value="0">Category</option>
                  {categories.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.label}
                      </option>
                    );
                  })}
                  </select>
    </div>
                  <button className="button is-primary is-normal"
                  onClick={() => {
                  sendCategoryFilterRequestToApi(currentCategory);}}
                  >Filter Categories</button>
                  </div>
                  </>
  }

  const resetSearchandFilter = () => {
    return <>
    <div className="level-item">
    <button className="button is-primary is-normal"
                  onClick={() => {
                    getAllPosts()
      .then((allPostsArray) => {
        setAllPosts(allPostsArray);
      })
                  ;}}
                  >Reset Filters</button>
    </div>
    </>
  }


  const sendCategoryFilterRequestToApi = (categoryId) => {
    getAllPostsByCategory(categoryId).then((filteredPostsArray) => {
        setAllPosts(filteredPostsArray);
      });
  }

// This function will render all posts or filteredPosts depending on the current search term state.
  const renderPosts = () => {

    return (
      <>
          <section className="box">
            {allPosts.map((post) => (
            <AllPostsSingleView
            key={`post--${post.id}`}
            title={post.title}
            publicationDate={post.publication_date}
            authorFirstName={post.user.first_name}
            authorLastName={post.user.last_name}
            category={post.category.label}
            fullname={post.user.full_name}
            id= {post.id}
            />
            ))}
          </section>
      </>
    );

  }

return <>
<main className="container is-primary">
  <h1 className="title is-1 level-item">All Posts</h1>
<div className="level">
    <div className="level-item">
    <button className="button is-primary" onClick={() => {
    navigate('/postform')
}}>Create Post</button>
</div>
    </div>
  <div className="level">
  {renderSearchBar()}
  {renderCategoryDropDown()}
  {resetSearchandFilter()}
  </div>
  <div className="level">
    <div className="title is-5 level-item">Title</div>
    <div className="title is-5 level-item">Author</div>
    <div className="title is-5 level-item">Date</div>
    <div className="title is-5 level-item">Category</div>
</div>
    {renderPosts()}
</main>
</>
}