import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from './App';
const xp = require('./assets/images/xp.jpg');

test('renders the title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Reconnaissance de lichens/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the button', () => {
  render(<App />);
  const button = screen.getByText(/Charger une image/);
  expect(button).toBeInTheDocument();
  expect(button).toBeVisible();
});


// describe('<App />', () => {
//   const app = shallow(<App />);
//   global.URL.createObjectURL = jest.fn();

//   it('contains NOT <Image /> component', () => {
//     expect(app.find('Connect(Image)').exists()).toBe(false);
//   });

  // it('image component is displayed on input change', () => {
  //   act(() => {
  //     const { container } = render(<App />);
  //   })
  //   const imageInput = container.getByTestId( "image-loader-input");
  //   const file = new File([new ArrayBuffer(1)], 'file.jpg');
  //   const event = {
  //     target: {
  //       files: [file]
  //     }
  //   }
  //   act(() => {
  //       fireEvent.change(imageInput, event);
  //   })
  //   const image = screen.getAllByTestId("displayed-picture");
  //   expect(image).toBeVisible();

  // })
// })
