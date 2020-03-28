import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
  return <CircularProgress size={20} color='inherit' disableShrink />;
}