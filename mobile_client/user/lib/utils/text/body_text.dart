import 'package:flutter/material.dart';

class TextBody extends StatelessWidget {
  final String text;
  final TextOverflow overFlow;
  const TextBody({super.key, required this.text, required this.overFlow});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.bodyMedium,
      overflow: overFlow,
      maxLines: overFlow == TextOverflow.ellipsis ? 2 : null,
    );
  }
}
