import 'package:flutter/material.dart';

class WeatherTabView extends StatefulWidget {
  const WeatherTabView({super.key});

  @override
  State<WeatherTabView> createState() => _WeatherTabViewState();
}

class _WeatherTabViewState extends State<WeatherTabView> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text('Weather')),
    );
  }
}
