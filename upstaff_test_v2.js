const addSpecialDiv = () => {
	// Function to insert the special div
	const insertNewDiv = () => {
		const allProducts = document.querySelector('.product-items');
		const productsList = allProducts.querySelectorAll('.product-item');

		const myDiv = mainDivCreator();

		productsList.length > 4
			? // Inserted after the 4th product according to the requirements of the task.
			  allProducts.insertBefore(myDiv, productsList[4])
			: // Insert before the last product if there are less than 5 products on the page.
			  allProducts.insertBefore(
					myDiv,
					productsList[productsList.length - 1]
			  );

		// Set content size according to screen width
		windSize();
	};

	// Function to create the special div
	const mainDivCreator = () => {
		const colors = ['#ff5733', '#33ff57', '#5733ff', '#f3ff33']; //Simple example!!!
		//Encapsulated to illustrate a function call passing a data for processing and returning full-filed HTML components.

		const mainBox = document.createElement('div');
		const contentBox = document.createElement('div');
		const sideNavigationContainer = document.createElement('div');
		const carouselContainer = document.createElement('div');

		// main container/main content id/class/css
		mainBox.id = 'mySpecialDiv';
		mainBox.style.cssText = `
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin: 1rem 0;
		position: relative;
		`;

		contentBox.classList.add('vidget-content');
		contentBox.style.cssText = `
		display: flex;
		position: relative;
		overflow: hidden;
		border-radius: 10px;
		margin: 0 0 1rem;
		width: 100%;
		background: #fff;
		box-shadow: 1px 1px 5px 5px #f1f1f1;`;

		sideNavigationContainer.classList.add('side-nav-dtn');
		sideNavigationContainer.style.cssText = `
		display: contents;
		position: relative;
		width: 100%;
		height: 100%
		 `;

		//  create content from simple example data
		const slides = carouselContent(colors);

		// Create and style carousel container
		carouselContainer.id = 'carouselButtonns';
		carouselContainer.classList.add('carousel-container');
		carouselContainer.style.cssText = `
			position: absolute;
			height: fit-content;`;

		// Add slides and navigation button
		slides.forEach((slide, index) => {
			slide.style.transform = 'translateX(105%)';
			slide.style.transition = 'transform 0.5s ease-in-out';
			contentBox.appendChild(slide);

			const button = document.createElement('button');
			button.textContent = `${index + 1}`;
			button.style.cssText = `
			border-radius: 10px;
			padding: 2px 6px;
			color: #fff;
			border: 2px #767676;
			background: #767676;
			`;
			button.addEventListener('click', () => showSlide(index));
			carouselContainer.appendChild(button);
		});

		// Function to show a slide
		let currentSlideIndex = 0;

		const showSlide = (index) => {
			if (index >= 0 && index < slides.length) {
				slides[currentSlideIndex].style.transform = 'translateX(105%)';
				slides[currentSlideIndex].style.transition =
					'transform 0.5s ease-in-out';
				carouselContainer.children[
					currentSlideIndex
				].style.dorderColor = '#767676';
				carouselContainer.children[
					currentSlideIndex
				].style.backgroundColor = '#767676';

				slides[index].style.transform = 'translateX(0)';
				slides[index].style.transition = 'transform 0.5s ease-in-out';
				carouselContainer.children[index].style.borderColor = '#000';
				carouselContainer.children[index].style.backgroundColor =
					'#000';
				currentSlideIndex = index;
			}
		};

		//Side nav buttons/ actions
		const { prevButton, nextButton } = createSideNavigationButtons();

		const showChildElement = () => {
			// sideNavigationContainer.style.display = 'contents';
			prevButton.style.transition = 'opacity 0.8s';
			nextButton.style.transition = 'opacity 0.8s';
			prevButton.style.transform = 'translateX(0)';
			nextButton.style.transform = 'translateX(0)';
			prevButton.style.transition =
				'opacity 0.5s, transform 0.5s ease-in-out';
			nextButton.style.transition =
				'opacity 0.5s, transform 0.5s ease-in-out';
			prevButton.style.opacity = '1';
			nextButton.style.opacity = '1';
		};

		const hideChildElement = () => {
			prevButton.style.transform = 'translateX(-15px)';
			nextButton.style.transform = 'translateX(15px)';
			prevButton.style.transition =
				'opacity 0.5s ,transform 0.5s ease-in-out';
			nextButton.style.transition =
				'opacity 0.5s, transform 0.5s ease-in-out';

			prevButton.style.opacity = '0';
			nextButton.style.opacity = '0';
		};

		mainBox.addEventListener('mouseenter', showChildElement);

		mainBox.addEventListener('mouseleave', hideChildElement);

		//Side nav buttons actions
		prevButton.addEventListener('click', () =>
			currentSlideIndex > 0
				? showSlide(currentSlideIndex - 1)
				: showSlide(currentSlideIndex + slides.length - 1)
		);

		nextButton.addEventListener('click', () =>
			currentSlideIndex !== slides.length - 1
				? showSlide(currentSlideIndex + 1)
				: showSlide(currentSlideIndex - (slides.length - 1))
		);

		// Append navigation buttons to the main container
		sideNavigationContainer.appendChild(prevButton);
		sideNavigationContainer.appendChild(nextButton);

		// Show first slide
		showSlide(0);

		//Added components to main div (mainBox)
		mainBox.appendChild(sideNavigationContainer);
		mainBox.appendChild(contentBox);
		mainBox.appendChild(carouselContainer);

		return mainBox;
	};

	//Generates the content for the carousel slides
	const carouselContent = (content) => {
		const contentArray = [];

		for (let i = 0; i < content.length; i++) {
			const boxContent = document.createElement('div');
			const imgContent = document.createElement('div');
			const textContent = document.createElement('div');
			const text = document.createElement('span');
			const button = document.createElement('button');

			// Add classes and styles
			boxContent.id = 'carouselContent';
			boxContent.classList.add('carousel-box');
			imgContent.classList.add('carousel-img');
			text.classList.add('carousel-text');

			boxContent.style.cssText = `
            		display: flex;
			position: absolute;
			border-radius: 10px;
            		width: 100%;
			height: 100%;
           		justify-content: center;
           		align-items: center;
            		text-align: center;
            		`;

			textContent.style.cssText = `
			display: flex;
			flex-direction: column;
			align-items: center;
			width: fit-content;
			width: calc(50% - 1rem);
			margin: 0.5rem 2rem 2rem 1rem;
   			padding: 0 1rem;
      			`;

			text.textContent = `Slide ${
				i + 1
			}! Ipsum esse excepteur proident enim exercitation tempor elit incididunt exercitation.`;
			text.style.fontSize = '20px';
			text.style.fontWeight = 'bold';
			text.style.color = '#000';

			button.textContent = 'Learn More';
			button.style.cssText = `
			width: fit-content;
			color: #fff;
			#E62176;
			border: none;
			border-radius: 10px;
			padding: 10px 20px;
			margin: 1em 0 ;
			cursor: pointer;`;
			button;

			// button actions

			const hoverIn = () => {
				button.style.backgroundColor = '#E62176';
				button.style.transition = 'background-color 0.5s ease';
			};

			const hoverOut = () => {
				button.style.backgroundColor = '';
				button.style.transition = 'background-color 0.5s ease';
			};

			button.addEventListener('mouseenter', hoverIn);

			button.addEventListener('mouseleave', hoverOut);

			button.addEventListener('click', (e) => {
				e.preventDefault();
				alert(`Your collor is ${content[i]}`);
			});

			imgContent.style.cssText = `
				background-color: ${content[i]};
				background-size: cover;
				height: 100%;
				width: calc(100% - 1rem);
				border-radius: 10px;`;

			// Append elements
			textContent.appendChild(text);
			textContent.appendChild(button);
			boxContent.appendChild(textContent);
			boxContent.appendChild(imgContent);

			contentArray.push(boxContent);
		}
		return contentArray;
	};

	//Create side navigation buttons
	const createSideNavigationButtons = () => {
		// Create previous button
		const prevButton = document.createElement('button');
		prevButton.innerHTML = '&lt;';

		prevButton.style.cssText = `
		font-size: xxx-large;
		position: absolute;
		opacity: 0;
		right: 0;
		top: 0;
		bottom: 0;
		transform: translateX(-15px);
		background-color: rgba(0, 0, 0, 0);
		color: rgb(87, 85, 85);
		border: none;
		border-radius: 10px;
		cursor: pointer;
		z-index: 1`;

		// Create next button
		const nextButton = document.createElement('button');
		nextButton.innerHTML = '&gt;';

		nextButton.style.cssText = `
		font-size: xxx-large;
		position: absolute;
		opacity: 0;
		left: 0;
		top: 0%;
		bottom: 0%;
		transform: translateX(15px);
		background-color: rgba(0, 0, 0, 0);
		color: rgb(87, 85, 85);
		border: none;
		border-radius: 10px;
		cursor: pointer;
		z-index: 1;
		`;

		return { prevButton, nextButton };
	};

	// Function for window resizing
	const windSize = () => {
		const newWidth = window.innerWidth;
		const mySpetialDiv = document.querySelector('#mySpecialDiv');
		const myContent = document.querySelectorAll('#carouselContent');
		const myCarousel = document.querySelector('#carouselButtonns');

		if (mySpetialDiv) {
			mySpetialDiv.style.width =
				newWidth > 1199 ? '50%' : newWidth > 767 ? '63%' : '100%';
			mySpetialDiv.style.height = newWidth < 768 ? '554px' : 'auto';
			if (newWidth < 581) {
				myCarousel.style.top = '90%';
				myCarousel.style.left = '50%';
				myCarousel.style.transform = 'translate(-50%, 0%)';
				myContent.forEach((content) => {
					content.style.flexDirection = 'column-reverse';
					content.children[0].style.width = 'auto';
					content.children[1].style.width = '100%';
				});
			} else {
				myCarousel.style.top = '85%';
				myCarousel.style.left = 'calc(63% + (100% - 70%)/2)';
				myCarousel.style.transform = 'translate(-50%, 0%)';
				myContent.forEach((content) => {
					content.style.flexDirection = 'row';
					content.children[0].style.width = 'calc(50% - 1rem)';
					content.children[1].style.width = 'calc(100% - 1rem)';
				});
			}
		}
	};

	//Add event listener to handle window resizing
	window.addEventListener('resize', windSize);

	// Insert the special div into the DOM
	insertNewDiv();
};

// Call the addSpecialDiv function to create and display the special div
addSpecialDiv();
