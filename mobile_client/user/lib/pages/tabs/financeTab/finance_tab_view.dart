import 'package:flutter/material.dart';

class FinanceTabView extends StatefulWidget {
  const FinanceTabView({super.key});

  @override
  State<FinanceTabView> createState() => _FinanceTabViewState();
}

class _FinanceTabViewState extends State<FinanceTabView> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text('Finance')),
    );
  }
}
