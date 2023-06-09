import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class CustomCarouselSlider extends StatefulWidget {
  final List<Widget> items;
  const CustomCarouselSlider({
    super.key,
    required this.items,
  });
  @override
  State<CustomCarouselSlider> createState() => _CustomCarouselSliderState();
}

class _CustomCarouselSliderState extends State<CustomCarouselSlider> {
  final CarouselController carouselController = CarouselController();
  int _currentPage = 0;

  IconData indicatorIcon(int i) {
    return _currentPage != i ? Icons.circle_outlined : Icons.circle_rounded;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CarouselSlider(
          options: CarouselOptions(
            height: 150,
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 10),
            autoPlayAnimationDuration: const Duration(milliseconds: 800),
            enlargeCenterPage: true,
            enlargeFactor: 0.2,
            viewportFraction: 0.85,
            disableCenter: false,
            initialPage: _currentPage,
            onPageChanged: (index, reason) {
              setState(() {
                _currentPage = index;
              });
            },
          ),
          carouselController: carouselController,
          items: widget.items,
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(indicatorIcon(0), color: Colors.grey, size: 15),
            Icon(indicatorIcon(1), color: Colors.grey, size: 15),
            Icon(indicatorIcon(2), color: Colors.grey, size: 15),
            Icon(indicatorIcon(3), color: Colors.grey, size: 15),
            Icon(indicatorIcon(4), color: Colors.grey, size: 15),
          ],
        ),
      ],
    );
  }
}
