import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Input, Select, Button, Table, Divider, Popover, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
import { cutOffStr } from '../../utils/utils';
import { fmtTime, fmtDateTime } from '../../utils/fmt';
import { SorterOrderMapper, SendStateArray, SendStateMapper, MessageTypeMapper, ReceiveStateMapper, MessageTypeArray } from '../../utils/enum';
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
    if (queryParam.sendTimeStart) {
      queryParam.sendTimeStart = fmtDateTime(queryParam.sendTimeStart, "YYYY-MM-DD 00:00:00");
    }
    if (queryParam.sendTimeEnd) {
      queryParam.sendTimeEnd = fmtDateTime(queryParam.sendTimeEnd, "YYYY-MM-DD 23:59:59");
    }
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
          <Form.Item label="Send ID">
            {getFieldDecorator('sendId', { initialValue: queryParam.sendId })(
              <Input placeholder="Send ID" />
            )}
          </Form.Item>
          <Form.Item label="系统名字">
            {getFieldDecorator('sysName', { initialValue: queryParam.sysName })(
              <Input placeholder="系统名字" />
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
        </Row>
        <Row>
          <Form.Item label="消息类型">
            {getFieldDecorator('messageType', { initialValue: queryParam.messageType })(
              <Select placeholder="消息类型" allowClear={true}>
                {MessageTypeArray.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="发送时间">
            {getFieldDecorator('sendTimeStart', { initialValue: queryParam.sendTimeStart ? moment(queryParam.sendTimeStart) : undefined })(
              <DatePicker placeholder="发送时间-开始" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item label="发送时间">
            {getFieldDecorator('sendTimeEnd', { initialValue: queryParam.sendTimeEnd ? moment(queryParam.sendTimeEnd) : undefined })(
              <DatePicker placeholder="发送时间-结束" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item className={styles.formItemButton}>
            <Button type="primary" htmlType="submit" disabled={queryLoading}>查询</Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }

  // 目标帐号
  getTargetAccount = (messageObject) => {
    if (!messageObject) return '-';
    const { to } = JSON.parse(messageObject);
    if (to instanceof Array && to.length > 0) {
      return <span title={to.length >= 2 ? `目标帐号总数${to.length}个` : undefined}>{to[0]}</span>;
    } else if ((typeof to) === "string") {
      return <span>{to}</span>;
    }
    return '-';
  }

  getContent = (messageObject) => {
    if (!messageObject) return undefined;
    const object = JSON.parse(messageObject);
    const styleLable = { display: 'inline-block', width: 65, textAlign: 'left', fontWeight: 'bold', verticalAlign: "top" };
    const styleValue = { display: 'inline-block', width: 350, textAlign: 'left' };
    return (
      <Fragment>
        <div>
          <span style={styleLable}>异步发送</span>
          <span style={{ ...styleValue, color: '#1890ff' }}>{object.asyncCallBack}</span>
        </div>
        <div>
          <span style={styleLable}>消息内容</span>
          <span style={styleValue}>{cutOffStr(object.content, 600)}</span>
        </div>
      </Fragment>
    );
  }

  // 数据表格
  getTable() {
    const { MessageSendLogModel, queryLoading } = this.props;
    const columns = [
      { title: 'Send ID', dataIndex: 'sendId' },
      { title: '系统名称', dataIndex: 'sysName' },
      {
        title: '消息类型', dataIndex: 'messageType', render: val => {
          let messageType = MessageTypeMapper[`${val}`];
          if (!messageType) messageType = MessageTypeMapper.error;
          return <span>{messageType.label}</span>
        },
      },
      { title: '目标帐号', dataIndex: 'messageObject', render: this.getTargetAccount },
      {
        title: '模版名称', dataIndex: 'templateName', render: (val, record) => {
          const content = this.getContent(record.messageObject);
          if (!content) return <span>{val || '--'}</span>;
          return (
            <Popover content={content} title="发送消息内容" trigger="hover" placement="rightTop">
              <span style={{ color: '#1890ff', cursor: 'pointer' }}>{val || '--'}</span>
            </Popover>
          );
        },
      },
      {
        title: '发送状态', dataIndex: 'sendState', render: (val, record) => {
          let sendState = SendStateMapper[`${val}`];
          if (!sendState) sendState = SendStateMapper.error;
          return <span style={{ color: sendState.color }} title={record.failReason ? record.failReason : undefined}>{sendState.label}</span>
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
      { title: '接收时间', dataIndex: 'receiveTime', render: val => <span>{val || '-'}</span> },
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
