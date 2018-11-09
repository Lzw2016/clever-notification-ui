import React, { PureComponent } from 'react';
import { Card, Pagination, DatePicker, TimePicker, Calendar, Popconfirm, Table, Modal, Button, Select, Transfer, Radio } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { FormattedMessage, defineMessages } from 'react-intl';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { LocaleLanguage, SystemInfo } from '../../utils/constant';
import { changeLocale } from '../../utils/utils';
// import classNames from 'classnames';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const messages = defineMessages({
  test: { id: 'dashboard.test', defaultMessage: '国际化功能测试(默认文案)' },
  test2: { id: 'dashboard.test3', defaultMessage: '国际化功能测试2(默认文案)' },
});

@connect(({ global, loading }) => ({
  global,
  queryLoading: loading.effects['global/queryPage'],
}))
export default class Dashboard extends PureComponent {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  changeLocale = e => {
    const locale = e.target.value;
    changeLocale(locale);
  };

  render() {
    const { visible } = this.state;

    const info = () => {
      Modal.info({
        title: 'some info',
        content: 'some info',
      });
    };
    const confirm = () => {
      Modal.confirm({
        title: 'some info',
        content: 'some info',
      });
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className="change-locale">
            <span style={{ marginRight: 16 }}>选择系统语言: </span>
            <Radio.Group defaultValue={SystemInfo.currentLocale} onChange={this.changeLocale}>
              <Radio.Button key="en" value={LocaleLanguage.en_US.locale}>
                English
              </Radio.Button>
              <Radio.Button key="cn" value={LocaleLanguage.zh_CN.locale}>
                中文
              </Radio.Button>
            </Radio.Group>
          </div>
          <br />
          <span>
            {SystemInfo.currentLocale} - <FormattedMessage {...messages.test} />
          </span>
          <br />
          123456789
          <br />
          <div className={styles.example}>
            <Pagination defaultCurrent={1} total={50} showSizeChanger />
          </div>
          <div className={styles.example}>
            <Select showSearch style={{ width: 200 }}>
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
            </Select>
            <DatePicker />
            <TimePicker />
            <RangePicker style={{ width: 200 }} />
          </div>
          <div className={styles.example}>
            <Button type="primary" onClick={this.showModal}>
              Show Modal
            </Button>
            <Button onClick={info}>Show info</Button>
            <Button onClick={confirm}>Show confirm</Button>
            <Popconfirm title="Question?">
              <a href="#">Click to confirm</a>
            </Popconfirm>
          </div>
          <div className={styles.example}>
            <Transfer dataSource={[]} showSearch targetKeys={[]} render={item => item.title} />
          </div>
          <div style={{ width: 319, border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar fullscreen={false} value={moment()} />
          </div>
          <div className={styles.example}>
            <Table dataSource={[]} columns={columns} />
          </div>
          <Modal title="Locale Modal" visible={visible} onCancel={this.hideModal}>
            <p>Locale Modal</p>
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}
