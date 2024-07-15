const { useState, useEffect } = React;

const Carousel = ({ slides, autoSlide = false, autoSlideInterval = 3000 }) => {
  const [curr, setCurr] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleShare = () => {
    alert("Share functionality will be implemented here.");
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="carousel-item">
            {slide.type === 'image' ? (
              <img src={slide.src} alt={`Slide ${i + 1}`} />
            ) : (
              <video src={slide.src} controls />
            )}
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={prev}>&#10094;</button>
      <button className="carousel-button next" onClick={next}>&#10095;</button>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${curr === i ? "active" : ""}`} onClick={() => setCurr(i)}></span>
        ))}
      </div>
      <div className="carousel-actions">
        <button onClick={handleLike}>
          <i className="material-icons">thumb_up</i> Like ({likes})
        </button>
        <button onClick={handleDislike}>
          <i className="material-icons">thumb_down</i> Dislike ({dislikes})
        </button>
        <button onClick={handleShare}>
          <i className="material-icons">share</i> Share
        </button>
      </div>
    </div>
  );
};

const Grid = () => {
  const images = [
    "https://th.bing.com/th/id/OIP.zA0WrWtO5kZmrjlp1jMzFAHaHa?rs=1&pid=ImgDetMain",
    "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:540/1131967/2xSeTYKMEL-1131967_1.jpg",
    "https://cdni.llbean.net/is/image/wim/505026_33335_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2",
    "https://th.bing.com/th/id/R.730b9d0e317a8078d1b3b7bd0808cf28?rik=9fAS7K9MLlY1iw&riu=http%3a%2f%2fimg.shein.com%2fimages%2fshein.com%2f201605%2f1464060544868371186.jpg&ehk=5JkzV28NstTNUGRYw3xb%2fhjhYhLO7MC0E22EcoIpv4Q%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.Ye5x4YssBsgiBvei9xvzCQAAAA?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.u1mObfJPiUB-G_H69UMa7gHaJl?rs=1&pid=ImgDetMain",
    "https://images-na.ssl-images-amazon.com/images/I/81htnJaNUHL._AC_SL1500_.jpg",
    "https://th.bing.com/th/id/OIP.afkOF38fjLWgm-nXlqglxgAAAA?rs=1&pid=ImgDetMain",
    "https://www.benbridge.com/on/demandware.static/-/Sites-bbj-master-catalog/default/dwb133dcc4/images/766295_02.jpg",
  ];

  const [itemsInBag, setItemsInBag] = useState(0);

  const addToBag = () => {
    setItemsInBag(itemsInBag + 1);
    alert("Item added to bag!");
  };

  return (
    <div className="grid">
      {images.map((src, i) => (
        <div key={i} className="grid-item">
          <img src={src} alt={`Grid item ${i + 1}`} />
        </div>
      ))}
      <button className="add-to-bag-button" onClick={addToBag}>
        <i className="material-icons">shopping_bag</i> Add to Bag
      </button>
    </div>
  );
};

const Profile = () => {
  return (
    <article className="profile">
      <div className="profile-image">
      
      </div>
      
      <div className="profile-actions">
        
        <button className="btn btn--icon">
          <i className="ph-export"></i>
        </button>
        <button className="btn btn--icon">
          <i className="ph-dots-three-outline-fill"></i>
        </button>
      </div>
      <div className="profile-links">
        <a href="#" className="link link--icon">
          <i className="ph-twitter-logo"></i>
        </a>
        <a href="#" className="link link--icon">
          <i className="ph-facebook-logo"></i>
        </a>
        <a href="#" className="link link--icon">
          <i className="ph-instagram-logo"></i>
        </a>
      </div>
    </article>
  );
};

const App = () => {
  const slides = [
    { type: 'video', src: 'Video 1.mp4' },
    { type: 'video', src: 'Video 2.mp4' },
    { type: 'video', src: 'Video 3.mp4' },
    { type: 'video', src: 'Video 4.mp4' },
  ];

  return (
    <div className="container">
      <Profile />
      <Carousel slides={slides} autoSlide={true} autoSlideInterval={10000} />
      <Grid />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
