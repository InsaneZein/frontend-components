import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { ScalprumComponent } from '@scalprum/react-core';
import { useHistory } from 'react-router-dom';
import { useStore } from 'react-redux';
import { Bullseye, Spinner } from '@patternfly/react-core';
import InventoryLoadError from './InventoryLoadError';
import classNames from 'classnames';

const BaseAppInfo = (props) => {
  const history = useHistory();
  const store = useStore();
  const Cmp = props.component;
  return (
    <Cmp className={classNames(props.className, 'inventory')}>
      <Suspense fallback={props.fallback}>
        <ScalprumComponent
          history={history}
          store={store}
          appName="inventory"
          module="./AppInfo"
          scope="inventory"
          ErrorComponent={<InventoryLoadError component="InventoryDetailHead" history={history} store={store} {...props} />}
          ref={props.innerRef}
          {...props}
        />
      </Suspense>
    </Cmp>
  );
};

BaseAppInfo.propTypes = {
  fallback: PropTypes.node,
  innerRef: PropTypes.object,
  component: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Inventory sub component.
 *
 * This component shows tab(s) with detail information about selected system.
 */
const AppInfo = React.forwardRef((props, ref) => <BaseAppInfo innerRef={ref} {...props} />);

AppInfo.propTypes = {
  /** React Suspense fallback component. <a href="https://reactjs.org/docs/code-splitting.html#reactlazy" target="_blank">Learn more</a>. */
  fallback: PropTypes.node,
  /** Optional wrapper component */
  component: PropTypes.string,
  /** Optional classname applied to wrapper component */
  className: PropTypes.string,
};

AppInfo.defaultProps = {
  fallback: (
    <Bullseye className="pf-u-p-lg">
      <Spinner size="xl" />
    </Bullseye>
  ),
  component: 'section',
};

export default AppInfo;
