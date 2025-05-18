import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';

export interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={className}>
      <Spiral size="60" speed="0.85" color="#36a379" />
    </div>
  );
};

export default Loader;
