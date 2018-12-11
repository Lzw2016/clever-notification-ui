import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Input, Select, Button, Table, Divider } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
import { fmtTime } from '../../utils/fmt';
import { SorterOrderMapper, SendStateArray, SendStateMapper, MessageTypeMapper, ReceiveStateMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './MessageSendLog.less';

@connect(({ MessageSendLogModel, loading }) => ({
  MessageSendLogModel,
  queryLoading: loading.effects['MessageSendLogModel/findByPage'],
}))
@Form.create()
export default class MessageSendLog extends PureComponent {

  // 数据初始化
  componentDidMount() {
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    dispatch({ type: 'MessageSendLogModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, MessageSendLogModel } = this.props;
    const queryParam = { ...MessageSendLogModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'MessageSendLogModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { form: { getFieldDecorator }, queryLoading, MessageSendLogModel: { queryParam } } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="系统名字">
            {getFieldDecorator('sysName', { initialValue: queryParam.sysName })(
              <Input placeholder="系统名字" />
            )}
          </Form.Item>
          <Form.Item label="Send ID">
            {getFieldDecorator('sendId', { initialValue: queryParam.sendId })(
              <Input placeholder="Send ID" />
            )}
          </Form.Item>
          <Form.Item label="发送状态">
            {getFieldDecorator('sendState', { initialValue: queryParam.sendState })(
              <Select placeholder="发送状态" allowClear={true}>
                {SendStateArray.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="模版名称">
            {getFieldDecorator('templateName', { initialValue: queryParam.templateName })(
              <Input placeholder="模版名称" />
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
    const { MessageSendLogModel, queryLoading } = this.props;
    const columns = [
      { title: '系统名称', dataIndex: 'sysName' },
      { title: 'Send ID', dataIndex: 'sendId' },
      {
        title: '消息类型', dataIndex: 'messageType', render: val => {
          let messageType = MessageTypeMapper[`${val}`];
          if (!messageType) messageType = MessageTypeMapper.error;
          return <span>{messageType.label}</span>
        },
      },
      { title: '模版名称', dataIndex: 'templateName' },
      {
        title: '发送状态', dataIndex: 'sendState', render: val => {
          let sendState = SendStateMapper[`${val}`];
          if (!sendState) sendState = SendStateMapper.error;
          return <span style={{ color: sendState.color }}>{sendState.label}</span>
        },
      },
      { title: '发送时间', dataIndex: 'sendTime' },
      { title: '耗时', dataIndex: 'useTime', render: val => fmtTime(val) },
      // { title: '', dataIndex: 'failReason' },
      // { title: '', dataIndex: 'messageObject' },
      {
        title: '接收状态', dataIndex: 'receiveState', render: val => {
          let receiveState = ReceiveStateMapper[`${val}`];
          if (!receiveState) receiveState = ReceiveStateMapper.error;
          return <span style={{ color: receiveState.color }}>{receiveState.label}</span>
        },
      },
      // { title: '接收状态描述', dataIndex: 'receiveMsg' },
      { title: '接收时间', dataIndex: 'receiveTime' },
      // { title: '创建时间', dataIndex: 'createAt' },
      // { title: '更新时间', dataIndex: 'updateAt' },
      {
        title: '操作', align: 'center', key: 'action',
        render: () => (
          <Fragment>
            <a>详情</a>
            <Divider type="vertical" />
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
        dataSource={MessageSendLogModel.data}
        pagination={MessageSendLogModel.pagination}
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
