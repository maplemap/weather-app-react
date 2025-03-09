import './loader.scss';

export const Loader = () => {
  return (
    <div data-testid='loader'>
      <div className='loader-overlay'>
        <div className='spinner'>
          <div className='bounce1'></div>
          <div className='bounce2'></div>
          <div className='bounce3'></div>
        </div>
      </div>
    </div>
  );
};
