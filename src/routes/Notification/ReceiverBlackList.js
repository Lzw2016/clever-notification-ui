import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Input, Select, Button, DatePicker, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { SorterOrderMapper, StatusArray, MessageTypeArray } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './ReceiverBlackList.less';

@connect(({ ReceiverBlackListModel, loading }) => ({
  ReceiverBlackListModel,
  queryLoading: loading.effects['global/queryPage'],
}))
@Form.create()
export default class ReceiverBlackList extends PureComponent {

  // 数据初始化
  componentDidMount() {
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    dispatch({ type: 'ReceiverBlackListModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, ReceiverBlackListModel } = this.props;
    const queryParam = { ...ReceiverBlackListModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'ReceiverBlackListModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { form: { getFieldDecorator }, queryLoading, ReceiverBlackListModel: { queryParam } } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="系统名字">
            {getFieldDecorator('sysName', { initialValue: queryParam.sysName })(
              <Input placeholder="系统名字" />
            )}
          </Form.Item>
          <Form.Item label="黑名单帐号">
            {getFieldDecorator('account', { initialValue: queryParam.account })(
              <Input placeholder="黑名单帐号" />
            )}
          </Form.Item>
          <Form.Item label="消息类型">
            {getFieldDecorator('messageType', { initialValue: queryParam.messageType })(
              <Select placeholder="消息类型" allowClear={true}>
                {MessageTypeArray.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="是否启用">
            {getFieldDecorator('enabled', { initialValue: queryParam.enabled })(
              <Select placeholder="是否启用" allowClear={true}>
                {StatusArray.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
        </Row>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="过期时间">
            {getFieldDecorator('expiredTimeStart', { initialValue: queryParam.expiredTimeStart ? moment(queryParam.expiredTimeStart) : undefined })(
              <DatePicker placeholder="过期时间-开始" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item label="过期时间">
            {getFieldDecorator('expiredTimeEnd', { initialValue: queryParam.expiredTimeEnd ? moment(queryParam.expiredTimeEnd) : undefined })(
              <DatePicker placeholder="过期时间-结束" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item className={styles.formItemButton}>
            <Button type="primary" htmlType="submit" disabled={queryLoading}>查询</Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }

  // 数据表格
  getTable() {
    const { ReceiverBlackListModel, queryLoading } = this.props;
    const columns = [
      { title: '系统名称', dataIndex: 'sysName' },
      { title: '消息类型', dataIndex: 'messageType' },
      { title: '黑名单帐号', dataIndex: 'account' },
      { title: '是否启用', dataIndex: 'enabled' },
      { title: '过期时间', dataIndex: 'expiredTime' },
      // { title: '创建时间', dataIndex: 'createAt' },
      // { title: '更新时间', dataIndex: 'updateAt' },
      {
        title: '操作', align: 'center', key: 'action',
        render: () => (
          <Fragment>
            <a>删除</a>
          </Fragment>
        ),
      },
    ];
    return (
      <Table
        size="middle"
        bordered={true}
        rowKey={record => record.id}
        columns={columns}
        loading={queryLoading}
        dataSource={ReceiverBlackListModel.data}
        pagination={ReceiverBlackListModel.pagination}
        onChange={this.handleTableChange}
      />
    );
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div>
            {this.queryForm()}
          </div>
          {/* {this.actionButton()} */}
          {this.getTable()}
        </Card>
      </PageHeaderLayout>
    );
  }
}
