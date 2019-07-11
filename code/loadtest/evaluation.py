# !/usr/bin/python3.6
# -*- coding: UTF-8 -*-
# author: lucien
# 基础包： locust趋势图生成包
import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
from matplotlib import dates

clientNum = 1

hex_colors = [
    '#FF7500',
    '#F00056',
    '#0EB83A',
    '#00BC12',
    '#1BD1A5',
    '#0C8918',
    '#0AA344',
    '#2ADD9C',
    '#3DE1AD',
    '#424C50',
    '#DB5A6B',
    '#FF4E20',
    '#3EEDE7',
    '#4B5CC4',
    '#70F3FF',
    '#2E4E7E',
    '#3B2E7E',
    '#425066',
    '#8D4BBB',
    '#815476',
    '#808080',
    '#161823',
    '#50616D',
    '#725E82',
    '#A78E44',
    '#8C4356',
    '#F47983',
    '#B36D61',
    '#C93756',
    '#FF2121',
    '#C83C23',
    '#9D2933',
    '#FFF143',
    '#FF0097',
    '#A98175',
    '#C32136',
    '#6E511E',
    '#F20C00',
    '#F9906F',
    '#FF8936',
    '#DC3023',
    '#EAFF56',
    '#FFA400',
    '#60281E',
    '#44CEF6',
    '#F0C239',
    '#A88462',
    '#B35C44',
    '#B25D25',
    '#C89B40',
    '#D9B611',
    '#827100',
    '#C3272B',
    '#7C4B00',
    '#BDDD22',
    '#789262',
    '#FF8C31',
    '#C91F37',
    '#00E500',
    '#177CB0',
    '#065279',
]


def read_last_line(filename, csvdata):
    global clientNum
    with open(filename) as csvfile:
        lines = csvfile.readlines()
        targeline = lines[-1]
        xname = filename.split('_')[0].split('/')[-1][4:]
        outputline = "{},".format(xname) + targeline + "\n"
        csvdata.append(outputline)
        clientNum = clientNum + 1


class DataAnalyse:
    def __init__(self, dirname):
        self.dirname = dirname
        self.xfmt = dates.DateFormatter('%m/%d %H:%M')
        self._init_graph()  # 初始化趋势图大小
        self._set_graph()  # 初始化趋势图样式
        self.csvdata = []
        global clientNum
        clientNum = 1
        for root, dirs, files in os.walk(dirname):
            for file in files:
                if os.path.join(root, file).split('/')[-1][-12:] == "requests.csv":
                    read_last_line(os.path.join(root, file), self.csvdata)
        self.csvdata.sort(key=lambda innerdata: innerdata[0])
        open("./output.csv", "w").writelines(self.csvdata)

        headers = ['client', 'Method', 'Name', '# requests', '# failures', 'Median response time', 'Average response time',
                   'Min response time', 'Max response time', 'Average Content Size', 'Requests/s']  # 命名字段标题
        self.data = pd.read_csv("./output.csv", sep=',', names=headers)  # 从文件获取内容为DATAFRAME格式
        for col in headers[-8:1]:  # 转换response_time和size为int型
            self.data[col] = self.data[col].apply(lambda x: int(x))
        for col in headers[1:2]:  # 取消掉所有非int型的空格
            self.data[col] = self.data[col].apply(lambda x: x.strip())
        self.xdata = self.data['client']
        self.ydata = self.data['Average response time']
        # self.sorted_data = self.data.sort_values(by=['client'], ascending=[True])  # 对数据按照time和name进行降序排列
        # self.grouped_data = self.sorted_data.groupby('client')  # 对降序排列的数据，按名称分组
        # self.requests_counts = np.array([[key, len(group)] for key, group in self.grouped_data])  # 构建请求名和请求次数数组
        # print(self.sorted_data)
        # print(self.grouped_data)
        # print(self.requests_counts)

    def _init_graph(self):  # 设定趋势图大小 ***
        left, width = 0.1, 0.8
        bottom, height = 0.1, 0.8
        self.trend_scatter = [left, bottom, width, height]

    def _set_graph(self):  # 生成基本趋势图样式
        plt.clf()  # 清除figure中所有axes

        # Data for plotting
        # t = np.arange(0.0, 2.0, 0.01)
        # s = 1 + np.sin(2 * np.pi * t)
        #
        # fig, ax = plt.subplots()
        # ax.plot(t, s)
        #
        # ax.set(xlabel='time (s)', ylabel='voltage (mV)',
        #        title='About as simple as it gets, folks')
        # ax.grid()
        #
        # fig.savefig("test.png")
        # plt.show()

        self.ax_plot = plt.axes(self.trend_scatter)  # 套用axes大小
        self.ax_plot.grid(True)  # 打开网格
        self.ax_plot.set_ylabel('Average Response Time(ms)')  # 纵坐标标题
        self.ax_plot.set_xlabel('Concurrent client amount')  # 横坐标标题
        # self.ax_plot.figure.set_size_inches(15, 8)  # 画板大小
        # self.ax_plot.xaxis.set_yscale('linear')
        # self.ax_plot.xaxis.set_major_locator(dates.MinuteLocator(interval=5))  # 设定横坐标日期格式为5min间隔
        # self.ax_plot.xaxis.set_major_formatter(self.xfmt)  # 设定横坐标格式

    def generate_trend(self):  # 生成趋势图
        # start_index = 0
        # legend_list = []
        # 需要重写逻辑，调整图片大小
        # for index, request in enumerate(self.requests_counts):  # 为数组添加index标签
        #     name, count = request[0], int(request[1])  # 获取请求名和请求次数
        #     # print("name{}".format(name))
        #     # print("count{}".format(count))
        #     end_index = start_index + count
        #     x = self.grouped_data.get_group(name)['client'][start_index: end_index]  # 设置x轴数据
        #     y = self.grouped_data.get_group(name)['Average response time'][start_index:end_index]  # 设置y轴数据
        #     # print("{}  ---   {}".format(start_index, end_index))
        #     print(self.grouped_data.get_group(name)['client'])
        #     print(self.grouped_data.get_group(name)['Average response time'])
        #     # print(x)
        #     # print(y)
        #     self.ax_plot.plot(x, y)  # , '-', color=hex_colors[index + 1])  #, '-', color=hex_colors[index + 1]) 画图
        # legend_list.append(name)
        # plt.legend(legend_list)  # 打印legendcan not

        plt.plot(self.xdata, self.ydata)
        plt.title("load-test")
        plt.savefig(fname='.'.join(['./evaluation', 'png']))  # 保存趋势图
        # plt.show()  # 打印趋势图


if __name__ == '__main__':
    data = DataAnalyse('/home/wzl/sjtu/22/se/bamdb/SE231/code/loadtest/test.traces/')
    # print(data.sorted_data.info())
    data.generate_trend()
