import 'package:flutter/material.dart';
import 'package:user/utils/button/category_button.dart';
import 'package:user/utils/carouselSlider/carousel_slider.dart';
import 'package:user/utils/listTile/home_news_list_tile.dart';

import 'home_tab_view_model.dart';

class HomeTabView extends StatefulWidget {
  const HomeTabView({super.key});

  @override
  State<HomeTabView> createState() => _HomeTabViewState();
}

class _HomeTabViewState extends HomeTabViewModel {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 20),
            child: FutureBuilder(
              future: getTopFiveData(),
              builder: (context, snapshot) {
                if (snapshot.data == null) {
                  return const SizedBox(height: 175, child: Center(child: CircularProgressIndicator()));
                } else {
                  return CustomCarouselSlider(items: items);
                }
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 40),
            child: SizedBox(
              height: 50,
              child: ListView(
                physics: const BouncingScrollPhysics(),
                scrollDirection: Axis.horizontal,
                children: [
                  CategoryButton(onPressed: newsGlobal.isNotEmpty ? () => changeCategory('All') : null, text: 'All'),
                  CategoryButton(
                      onPressed: newsGlobal.isNotEmpty ? () => changeCategory('Sports') : null, text: 'Sports'),
                  CategoryButton(
                      onPressed: newsGlobal.isNotEmpty ? () => changeCategory('Journal') : null, text: 'Journal'),
                  CategoryButton(
                      onPressed: newsGlobal.isNotEmpty ? () => changeCategory('Weather') : null, text: 'Weather'),
                  CategoryButton(
                      onPressed: newsGlobal.isNotEmpty ? () => changeCategory('Finance') : null, text: 'Finance'),
                  CategoryButton(
                      onPressed: newsGlobal.isNotEmpty ? () => changeCategory('Technology') : null, text: 'Technology'),
                  CategoryButton(onPressed: newsGlobal.isNotEmpty ? () => changeCategory('Game') : null, text: 'Game'),
                ],
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 40) + const EdgeInsets.only(top: 20),
              child: FutureBuilder(
                future: getData(whichCategory),
                builder: (context, snapshot) {
                  if (snapshot.data == null) {
                    return const Center(child: CircularProgressIndicator());
                  } else {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      physics: const BouncingScrollPhysics(),
                      itemBuilder: (BuildContext context, int index) {
                        String imageString = snapshot.data?[index].image ?? '';
                        UriData? imageData = Uri.parse(imageString).data;
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 25),
                          child: ListTileHomeTab(
                            onTap: onNewsTab,
                            title: snapshot.data?[index].title ?? 'null_title',
                            subTitle: snapshot.data?[index].content ?? 'null_content',
                            image: Image.memory(imageData!.contentAsBytes()),
                          ),
                        );
                      },
                    );
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
