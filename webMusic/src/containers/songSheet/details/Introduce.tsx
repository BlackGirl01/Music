import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import { Help } from "../../../utils"
import Avatar from 'antd/lib/avatar';
import Button from 'antd/lib/button/button';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
/**
 * 介绍部分
 */
@inject('songSheetStore', 'playStore')
@observer
export class Introduce extends React.Component<any, any> {
    playAll() {
        this.props.playStore.addPlayList(this.props.songSheetStore.details.tracks, true);
    }
    render() {
        const detalis = this.props.songSheetStore.details.details || {};
        const creator = detalis.creator || {};
        return <div className="ss-d-introduce">
            <Row type="flex" justify="center" align="middle">
                <Col span={18} ><h1 style={{ margin: 0 }}>{detalis.name}</h1></Col>
                <Col span={6} >
                    <span><Icon type="notification" />{detalis.trackCount}</span> <span><Icon type="play-circle-o" />{detalis.playCount}</span>
                </Col>
            </Row>
            <div className="ss-d-author">
                <div><Avatar src={creator.avatarUrl} /></div>
                <div>{creator.nickname}</div>
                <div>{Help.DateFormat(detalis.createTime, "yyyy-MM-dd")}创建</div>
            </div>
            <div className="ss-d-btns">
                <Button type="dashed" onClick={this.playAll.bind(this)}><Icon type="play-circle-o" />播放全部</Button>
                <Button type="dashed"><Icon type="plus" /></Button>
                <Button type="dashed"><Icon type="folder-add" />收藏({detalis.subscribedCount})</Button>
                <Button type="dashed"><Icon type="export" />分享({detalis.shareCount})</Button>
                <Button type="dashed" disabled ><Icon type="download" />下载全部</Button>
            </div>
            <div className="ss-d-bq">
                <span>标签：{detalis.tags && detalis.tags.map(x => <span key={x}><Link to={x} >{x}</Link> / </span>)}</span>
            </div>
            <div className="ss-d-jj text-ellipsis-2">
                <span>简介：{detalis.description}</span>
            </div>
        </div>

    }
}