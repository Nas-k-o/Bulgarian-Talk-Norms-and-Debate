import pandas as pd
import matplotlib.pyplot as plt

def calculate_test_results():
    # test data
    results = [2,3,10,4,5,6,7,8,9,10]
    df = pd.DataFrame(results, columns=['Results'])
    mean = df['Results'].mean()
    std_dev = df['Results'].std()
    variance = df['Results'].var()
    median = df['Results'].median()
    mode = df['Results'].mode()[0]
    maximum = df['Results'].max()
    minimum = df['Results'].min()
    range_ = maximum - minimum
    percentile_25 = df['Results'].quantile(0.25)
    percentile_75 = df['Results'].quantile(0.75)
    iqr = percentile_75 - percentile_25
    skewness = df['Results'].skew()
    kurtosis = df['Results'].kurtosis()
    percentile_95 = df['Results'].quantile(0.95)
    percentile_99 = df['Results'].quantile(0.99)
    percentile_90 = df['Results'].quantile(0.90)
    percentile_10 = df['Results'].quantile(0.10)
    return results

def plot_results(results):
    df = pd.DataFrame(results, columns=['Results'])
    # Plot the results
    plt.plot(df['Results'])
    plt.title('Test Results')
    plt.xlabel('Test Number')
    plt.ylabel('Result')
    plt.show()

    plt.hist(df['Results'], bins=10, alpha=0.7, color='blue')  
    plt.title('Histogram of Test Results')
    plt.xlabel('Result')
    plt.ylabel('Frequency')
    plt.show()

    plt.boxplot(df['Results'])
    plt.title('Boxplot of Test Results')
    plt.ylabel('Result')
    plt.show()

def Main():
    results = calculate_test_results()
    plot_results(results)
    df = pd.DataFrame(results, columns=['Results'])
    print("Резултати от теста:", results)
    print("Средно:", sum(results) / len(results))
    print("Стандартно отклонение:", (sum((x - (sum(results) / len(results))) ** 2 for x in results) / len(results)) ** 0.5)
    print("Дисперсия:", sum((x - (sum(results) / len(results))) ** 2 for x in results) / len(results))
    print("Медиана:", sorted(results)[len(results) // 2])
    print("Мода:", max(set(results), key=results.count))
    print("Максимум:", max(results))
    print("Минимум:", min(results))
    print("Обхват:", max(results) - min(results))
    print("25-ти процентил:", sorted(results)[int(0.25 * len(results))])
    print("75-ти процентил:", sorted(results)[int(0.75 * len(results))])
    print("Интерквартилен обхват:", sorted(results)[int(0.75 * len(results))] - sorted(results)[int(0.25 * len(results))])
    print("Скюност:", (3 * (sum(results) / len(results) - sorted(results)[len(results) // 2])) / (sum((x - (sum(results) / len(results))) ** 2 for x in results) / len(results)) ** 0.5)
    df = pd.DataFrame(results, columns=['Results'])


if __name__ == "__main__":
    Main()
