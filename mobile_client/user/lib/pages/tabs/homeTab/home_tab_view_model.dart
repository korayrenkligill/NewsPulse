import 'dart:convert';

import 'package:flutter/material.dart';

import '../../../models/news_model.dart';
import 'home_tab_view.dart';
import 'package:http/http.dart' as http;

abstract class HomeTabViewModel extends State<HomeTabView> {
  List<News> newsGlobal = [];
  String whichCategory = 'All';

  final List<Widget> items = [1, 2, 3, 4, 5].map(
    (i) {
      return Builder(
        builder: (BuildContext context) {
          return Container(
              width: MediaQuery.of(context).size.width,
              margin: const EdgeInsets.symmetric(horizontal: 5.0),
              decoration: const BoxDecoration(color: Colors.amber),
              child: Center(child: Text('text $i', style: const TextStyle(fontSize: 24.0))));
        },
      );
    },
  ).toList();

  Future<List<News>> getData(String dataCategory) async {
    newsGlobal.clear();
    switch (dataCategory) {
      case 'All':
        String url = 'https://newspulse-api.glitch.me/news';
        var response = await http.get(Uri.parse(url));
        var responseData = jsonDecode(response.body);
        List<News> news = [];
        for (var singleNews in responseData) {
          News singleNew = News(
            id: singleNews['id'],
            title: singleNews['title'],
            content: singleNews['content'],
            time: singleNews['time'],
            image: singleNews['image'],
            categories: singleNews['categories'],
            parent: singleNews['parent'],
          );
          news.add(singleNew);
        }
        newsGlobal = news;
        setState(() {});
        return List.from(news.reversed);
      default:
        String url = 'https://newspulse-api.glitch.me/news';
        var response = await http.get(Uri.parse(url));
        var responseData = jsonDecode(response.body);
        List<News> news = [];
        List<News> newsTemp = [];
        for (var singleNews in responseData) {
          News singleNew = News(
            id: singleNews['id'],
            title: singleNews['title'],
            content: singleNews['content'],
            time: singleNews['time'],
            image: singleNews['image'],
            categories: singleNews['categories'],
            parent: singleNews['parent'],
          );
          news.add(singleNew);
        }

        for (var newSingle in news) {
          if (newSingle.parent == dataCategory) {
            newsTemp.add(newSingle);
            print('categoryElement: ${newSingle.title}, category: $dataCategory');
          }
        }
        newsGlobal = newsTemp;
        setState(() {});
        return List.from(newsTemp.reversed);
    }
  }

  Future<List<News>> getTopFiveData() async {
    String url = 'https://newspulse-api.glitch.me/news';
    var response = await http.get(Uri.parse(url));
    var responseData = jsonDecode(response.body);
    List<News> news = [];
    int counter = 0;
    for (var singleNews in responseData) {
      if (counter == 4) break;
      News singleNew = News(
        id: singleNews['id'],
        title: singleNews['title'],
        content: singleNews['content'],
        time: singleNews['time'],
        image: singleNews['image'],
        categories: singleNews['categories'],
        parent: singleNews['parent'],
      );
      news.add(singleNew);
      counter++;
    }
    return List.from(news.reversed);
  }

  changeCategory(String newCategory) {
    setState(() {
      whichCategory = newCategory;
    });
  }

  void onNewsTab() {}
}
