import 'package:flutter/material.dart';

class SportsTabView extends StatefulWidget {
  const SportsTabView({super.key});

  @override
  State<SportsTabView> createState() => _SportsTabViewState();
}

class _SportsTabViewState extends State<SportsTabView> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text('Sports')),
    );
  }
}
